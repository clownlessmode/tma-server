import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(findUserDto: FindUserDto): Promise<any> {
    const user = await this.usersService.findOne(findUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      role: user.meta.role,
    });
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      { expiresIn: '7d' }
    );
    user.refreshToken = refreshToken;
    await user.save();

    return { tokens: { access: accessToken, refresh: refreshToken }, user };
  }

  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const accessToken = this.jwtService.sign({ id: user.id });
    return { access: accessToken };
  }
}

import { Injectable } from '@nestjs/common';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as Vibrant from 'node-vibrant';

@Injectable()
export class DiscordService {
  async getDiscordData(url: string): Promise<{
    icon: string;
    colors: { light: string; dark: string };
    name: string;
  }> {
    try {
      const inviteCode = url.split('/invite/')[1];

      const response = await axios.get(
        `https://discordapp.com/api/v6/invites/${inviteCode}`
      );

      if (response.status === 200) {
        const { data } = response;
        const guildId = data.guild.id;
        const iconId = data.guild.icon;
        const extensions = ['gif', 'png', 'jpeg'];
        let iconUrl = null;
        const channelName = data.guild.name;

        for (const ext of extensions) {
          const url = `https://cdn.discordapp.com/icons/${guildId}/${iconId}.${ext}`;
          try {
            const imageResponse = await axios.head(url);
            if (imageResponse.status === 200) {
              iconUrl = url;
              break;
            }
          } catch (error) {}
        }

        if (!iconUrl) {
          throw new Error('Icon not found in any preferred format.');
        }

        // Получаем доминирующий цвет с помощью node-vibrant
        const palette = await Vibrant.from(iconUrl).getPalette();
        const darkColor = palette.DarkVibrant.hex;
        const lightColor = palette.LightVibrant.hex;

        return {
          icon: iconUrl,
          colors: { dark: darkColor, light: lightColor },
          name: channelName,
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching invite page:', error);
      return null;
    }
  }
}

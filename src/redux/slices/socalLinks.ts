// utils
import axios from '../../utils/axios';
import { SocialType } from 'src/@types/social';

export async function UpdateSocialInfo(data: SocialType, id?: string) {
  try {
    if (id) {
      await axios.post(`Contact/Update`, data, {
        params: {
          id: id,
        },
      });
    } else {
      await axios.post(`Contact/Add`, data);
    }
  } catch (error) {
    alert({ error });
  }
}
export async function getSocialLinks() {
  try {
    const response = await axios.get(`Contact/Get`, {
      params: { admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
    });
    return response.data;
  } catch (error) {
    alert({ error });
  }
}

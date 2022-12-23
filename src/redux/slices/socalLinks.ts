// utils
import axios from '../../utils/axios';
import { SocialType } from 'src/@types/social';

export async function UpdateSocialInfo(data: SocialType, id?: string) {
  console.log('updateeee', data);
  try {
    if (id) {
      await axios.post(`Redirections/Update`, data, {
        params: { id, admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
      });
    } else {
      console.log('updateeee no Id');

      await axios.post(`Redirections/Add`, data, {
        params: { admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
      });
    }
  } catch (error) {
    alert({ error });
  }
}
export async function getSocialLinks() {
  try {
    const response = await axios.get(`Redirections/Get`, {
      params: { admin_key: 'd8344117b4b11d7e09a29498a558b57923178c72' },
    });
    return response.data;
  } catch (error) {
    alert({error});
  }
}

/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { SocialType } from 'src/@types/social';
import { getSocialLinks } from 'src/redux/slices/socalLinks';
import SocialLinksEditForm from 'src/sections/@dashboard/social/crreate-edit-form/social-create-edit';

const SocialLinks = () =>
{
  const [links, setLinks] = useState<SocialType>();
  useEffect(() => {
    fetchSocialLinks();
  }, []);
  const fetchSocialLinks = async () => {
    let response = await getSocialLinks();
    console.log('response',response);
    return response;
  };
  return <SocialLinksEditForm />;
};
export default SocialLinks;

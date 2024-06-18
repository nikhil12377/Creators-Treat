interface IFacebookUserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date;
  languages: {
    name: string;
  }[];
  location: {
    name: string;
  } | null;
  picture: {
    data: {
      url: string;
    };
  } | null;
}

export default IFacebookUserProfile;


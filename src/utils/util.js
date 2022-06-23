const CLOUDFRONT_DOMAIN_NAME = "https://d3h0a68hsbn5ed.cloudfront.net";

export const getUserProfilePicUrl = ({ user_profile_pic, user_id }) => {
    return user_profile_pic
        ? CLOUDFRONT_DOMAIN_NAME + `/user/${user_id}/profile.jpg`
        : CLOUDFRONT_DOMAIN_NAME + `/user/default.jpg`;
};

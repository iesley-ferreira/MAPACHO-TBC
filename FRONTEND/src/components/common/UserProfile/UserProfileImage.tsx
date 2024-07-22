import React from 'react';

interface UserProfileImageProps {
  userImage: string;
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ userImage }) => {
  const profileImage = userImage || '/public/assets/userImage.jpg';

  return (
    <img
      className="absolute -top-12 left-1/2 transform -translate-x-1/2 rounded-full w-24 h-24"
      src={profileImage}
      alt="imagem de usuário"
    />
  );
};

export default UserProfileImage;

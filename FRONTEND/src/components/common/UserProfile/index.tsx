import React from 'react';

type UserProfileProps = {
  name: string;
  email: string;
  img: string;
};

const UserProfile: React.FC<UserProfileProps> = ({ name, email, img }) => {
  return (
    <div className="flex flex-col md:flex-row sm:flex-row items-center justify-center w-full py-8">
      {img ? (
        <img
          className="text-4xl w-24  h-24 sm:text-4xl rounded-full mb-4 sm:mb-0"
          src={img}
          style={{ color: 'var(--text-title)' }}
        ></img>
      ) : (
        <div className="flex items-center justify-center w-20 h-20 bg-gray-300 rounded-full">
          <i className="ri-user-fill text-5xl text-white"></i>
        </div>
      )}
      <div className="text-center pt-4 sm:text-left">
        <h1 className="text-xl font-semibold">João Marcelo{name}</h1>
        <p className="text-base">joão@gmail.com{email}</p>
      </div>
    </div>
  );
};

export default UserProfile;

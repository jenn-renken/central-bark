import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PETS, QUERY_PROFILE_BASIC } from '../utils/queries';
import PetGallery from '../components/PetGallery';
import Auth from '../utils/auth';
// import FriendList from '../components/FriendList';
import PetForm from '../components/PetForm';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PETS);
  const { data: userData } = useQuery(QUERY_PROFILE_BASIC);
  const pets = data?.pets || [];
  console.log(pets);
  const loggedIn = Auth.loggedIn();

  return (
    <main>   
      <div className='flex-row justify-space-between'>
        {loggedIn && (
          <div className='col-12 mb-3'>
            <PetForm />
          </div>
        )}
      <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PetGallery pets={pets} title="Make some new friends!" />
        )}
      </div>
      {/* {loggedIn && userData ? (
      <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={userData.profile.username}
            friendCount={userData.profile.friendCount}
            friends={userData.profile.friends}
          />
        </div>
      ) : null} */}
      </div>
    </main>
  );
};

export default Home;

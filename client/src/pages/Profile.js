import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import PetGallery from '../components/PetGallery';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';
import PetForm from '../components/PetForm';

const Profile = () => {
    const { username: userParam } = useParams();

    // const [addFriend] = useMutation(ADD_FRIEND);
  
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_PROFILE, {
      variables: { username: userParam }
    });
  
    const user = data?.profile || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      return <Redirect to ='/profile' />;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user?.username) {
      return (
        <h4>
          You need to be logged in to see this page.
        </h4>
      );
    }

    // const handleClick = async () => {
    //   try {
    //     await addFriend({
    //       variables: { id: user._id }
    //     });
    //   } catch (e) {
    //     console.error(e);
    //   }
    // };
  
    return (
      <div>
        <div className="section is-medium">
          <h2 className="subtitle is-3 has-text-link">
            Viewing {`${user.username}'s pets`}
          </h2>
          {/* {userParam && ( 
            <button className='btn ml-auto' onClick={handleClick}>Add Friend</button>
          )} */}
        </div>
  
        <div className="container">
          <div className="col-12 mb-3 col-lg-8">
            <PetGallery pets={user.pets} />
          </div>
{/* 
          <div className='col-12 col-lg-3 mb-3'>
            <FriendList
              username={user.username}
              friendCount={user.friendCount}
              friends={user.friends}
            />
          </div> */}
        </div>
        <div className='mb-3'>{!userParam && <PetForm />}</div>
      </div>
    );
  };

export default Profile;

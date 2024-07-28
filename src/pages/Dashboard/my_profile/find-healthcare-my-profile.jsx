import React, { useState } from 'react';
import '../css/find-healthcare-my-profile.css';
import profile_img from '../images/profile-image.png';

function App() {
    const [profileImg, setProfileImg] = useState(profile_img);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };
    return (
        <div className='find-healthcare-my-profile'>
            <h1 className='my-profile-heading'>My Profile</h1>

            <div className='my-profile-information'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='my-profile-information-form'>
                            <h2 className='my-profile-information-heading'>Profile Information</h2>
                            <p className='my-profile-information-sub-heading'>Update your account profile information and email address.</p>
                            <form action='php'>
                                <label>Name</label>
                                <input type='text' name='fname' id='fullname' placeholder='John Doe' />
                                <label>Email</label>
                                <input type='text' name='email' id='email' placeholder='John @doe.com' />
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <div className='my-profile-information-upload-image'>
                            <div className='my-profile-information-image-button'>
                                <img src={profileImg} alt='profile_image' className='my-profile-information-image' />
                                <input
                                    type='file'
                                    id='fileInput'
                                    style={{ display: 'none' }}
                                    accept='image/*'
                                    onChange={handleImageChange}
                                />
                                <button className='my-profile-information-button' onClick={handleClick}>Change image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-profile-information-save-button'>
                <button className='information-save-button'>Save</button>
            </div>

            <div className='my-profile-update-password my-profile-information'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='my-profile-information-heading'>Update Password</h2>
                        <p className='my-profile-information-sub-heading'>Ensure your account is using a long, random password to stay secure.</p>
                    </div>
                    <div className='col-md-12'>
                        <form action='php'>
                            <label>Current Password</label>
                            <input type='password' name='cpassword' id='cpassword' />
                        </form>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <form action='php'>
                            <label>New Password</label>
                            <input type='password' name='npassword' id='npassword' />
                        </form>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <form action='php'>
                            <label>Confirm Password</label>
                            <input type='password' name='confirmpassword' id='confirmpassword' />
                        </form>
                    </div>
                </div>
            </div>
            <div className='my-profile-information-save-button'>
                <button className='confirm-password information-save-button'>Save</button>
            </div>

            <div className='my-profile-delete-account my-profile-information'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h2 className='my-profile-information-heading'>Delete Account</h2>
                        <p className='my-profile-information-sub-heading'>Delete your account and all of your source data. This is irreversible.</p>
                    </div>
                </div>
            </div>
            <div className='my-profile-information-save-button delete-request-style'>
                <button className='confirm-password information-save-button'>Delete Request</button>
            </div>
        </div>
    );
}

export default App;

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import React from 'react';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-content'>
                <div className='footer-contacts'>
                    <div><EmailIcon /> info@petcorner.com </div>
                    <div><CallIcon /> (950)377-0713 </div>
                </div>       
                <div className='footer-buttons'>
                    <button className='footer-button' title='Facebook'><FacebookIcon /></button>
                    <button className='footer-button' title='Instagram'><InstagramIcon /></button>
                    <button className='footer-button' title='Twitter'><TwitterIcon /></button>
                </div>
            </div>           
            © 2022 Pet Corner
        </div>
    );
}
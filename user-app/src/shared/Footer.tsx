const d = new Date();
let year = d.getFullYear();

export default function Footer() {
    return (
        <div className='footer-bg footer'>
            <div className="container text-center">
                <p>
                <img src="/images/logo.webp" className="logo_dark" alt="ScholarHat eLearning Platform" style={{ height: '48px' }}/>
                <img src="/images/logo-white.png" className="logo_light"alt="ScholarHat eLearning Platform" style={{ height: '48px' }} />
                
                </p>
                <p style={{ marginBottom: 8 }}>Copyright © {year} Dot Net Tricks Innovation Pvt. Ltd. All Rights Reserved.</p>
                <div className='pb-4'>The course names and logos are the trademarks of their respective owners.</div>
            </div>
        </div>
    )
}

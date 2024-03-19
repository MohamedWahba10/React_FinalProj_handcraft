import React from 'react'

export default function Footer() {
    return (
        <div className="container-fluid mt-5 bg-black ">
            {/* Footer */}
            <footer className="text-center text-lg-start bg-black text-white" style={{ backgroundColor: '#929fba' }}>
                {/* Grid container */}
                <div className="container p-4 pb-0">
                    {/* Section: Links */}
                    <section className="">
                        {/* Grid row */}
                        <div className="row">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold fs-5 ">About us</h6>
                                <p className='text-secondary'>
                                    Handcrafted Marketplace is the global marketplace for unique
                                    and creative goods. It’s home to a universe of special,
                                    extraordinary items, from unique handcrafted pieces to vintage
                                    treasures.
                                </p>
                            </div>
                            {/* Grid column */}

                            <hr className="w-100 clearfix d-md-none" />

                            {/* Grid column */}
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold fs-5 ">Products</h6>
                                <p>
                                    <a href="#" className="text-decoration-none text-secondary">Accessories</a>
                                </p>
                                <p>
                                    <a href="#" className="text-decoration-none text-secondary">Clothes</a>
                                </p>
                                <p>
                                    <a className=" text-decoration-none text-secondary">Bags</a>
                                </p>
                                <p>
                                    <a href="#" className="text-decoration-none text-secondary">Skin care</a>
                                </p>
                            </div>
                            {/* Grid column */}

                            <hr className="w-100 clearfix d-md-none" />

                            {/* Grid column */}
                            <hr className="w-100 clearfix d-md-none" />

                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold fs-5 ">Contact</h6>
                                <p><i className="fas fa-home mr-3 text-secondary"></i>Cairo , Egypt</p>
                                <p><i className="fas fa-envelope mr-3 text-secondary"></i> HandCrafted@gmail.com</p>
                                <p><i className="fas fa-phone mr-3 text-secondary"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print mr-3 text-secondary"></i> + 01 234 567 89</p>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>

                                {/* Facebook */}
                                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="https://www.facebook.com/" target="_blank"  role="button">
                                    <i className="fab fa-facebook-f"></i>
                                </a>


                                {/* Twitter */}
                                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="#!" role="button">
                                    <i className="fab fa-twitter"></i>
                                </a>

                                {/* Google */}
                                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} href="#!" role="button">
                                    <i className="fab fa-google"></i>
                                </a>

                                {/* Instagram */}
                                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="https://www.instagram.com/" target="_blank"  role="button">
                                    <i className="fab fa-instagram"></i>
                                </a>

                                {/* Linkedin */}
                                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="https://www.linkedin.com/in/mohamedwahba9910/" target="_blank" role="button">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                {/* Github */}
                                <a className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }} href="https://github.com/MohamedWahba10/React_FinalProj_handcraft" target="_blank" role="button">
                                    <i className="fab fa-github"></i>
                                </a>
                            </div>
                        </div>
                        {/* Grid row */}
                    </section>
                    {/* Section: Links */}
                </div>
                {/* Grid container */}


            </footer>
            {/* Footer */}
        </div>
        /* End of .container */
    );
}

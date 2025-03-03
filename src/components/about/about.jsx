import React from 'react'
import Image from 'next/image'

function About() {
  return (
    <>
        <section className="main_home_about_container px-[50px] mt-[50px] mb-5">
            <div className="main_home_about_row">
                <div className="main_home_about_col main_home_about_col_images">
                    <Image src="/images/home-aboutUs.jpg" width={400} height={400} />
                </div>
                <div className="main_home_about_col main_home_about_col_text"></div>
            </div>
        </section>
    </>
  )
}

export default About
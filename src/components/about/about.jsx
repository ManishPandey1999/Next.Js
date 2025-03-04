import React from 'react'
import Image from 'next/image'

function About() {
  return (
    <>
        <section className="main_home_about_container px-[80px] mt-[50px] mb-5">
            <div className="main_home_about_row flex items-center gap-5">
                <div className="main_home_about_col main_home_about_col_images md:w-[48%]">
                    <Image src="/images/home-aboutUs.jpg" className='w-[480px] rounded' width={400} height={400} alt='about image' />
                </div>
                <div className="main_home_about_col main_home_about_col_text md:w-[48%]">
                  <h2 className='text-2xl font-bold mb-3'>About Us</h2>
                  <p className="about_text mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint commodi, ad quam nostrum earum labore beatae iure tenetur. Vel sunt voluptates sed totam! Odit vero totam tempore inventore eius neque!
                  </p>
                  <p className="about_text mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis necessitatibus eaque voluptas harum saepe, dolorem enim corrupti quasi distinctio totam nesciunt quas fuga, corporis eveniet aspernatur neque quam nobis delectus.
                  </p>
                  <p className="about_text mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, et. Accusantium minus repudiandae, saepe quidem hic expedita officia, eligendi molestiae aliquid est iusto ipsa in!
                  </p>
                </div>
            </div>
        </section>
    </>
  )
}

export default About
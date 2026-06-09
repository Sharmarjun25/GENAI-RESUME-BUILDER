import React from 'react'
import "../style/home.scss"
export const Home = () => {
    return (
        <main className='home'>

            <div className='page-heading'><h1>Design your Own <span className='highlight'>Interview RoadMap</span></h1>
                <p>Create.Practice.Get Hired. </p>

            </div>
            <div className='interview-input-group'>
                <div className='left'>
                    <textarea name='jobDescription' id="jobDescription" placeholder='Enter job description here...'></textarea>
                </div>
                <div className='right'>
                    <div className='input-group'>
                        <p>Resume <small className='highlight'>(Use Resume and Self description together to get best results )</small></p>
                        <label className='file-label' htmlFor='resume'>Upload Resume</label>
                        <input hidden type='file' name='resume' id='resume' accept='.pdf' />

                    </div>
                    <div className='input-group'>
                        <label htmlFor='selfdescription'>Self Description</label>
                        <textarea name='selfDescription' id='selfDescription' placeholder='Describe yourself in a fewq sentences...'></textarea>
                    </div>
                    <button className='button primary-button'>Generate My Interview Report</button>
                </div>

            </div>

        </main>
    )
}

import { NavLink, Outlet } from 'react-router-dom';
import '../../assets/css/training.css';

export default function SubscribedTraining() {
  return (
    <div className='pt-5'>
      <div className="block-header"><h2>My Live Training</h2></div>
      <div className='pt-2'>
        <div className='tab'>
          <NavLink to="" end className="tablink"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="20px" viewBox="0 -960 960 960"><path d="M480-406.247q-48.522 0-81.674-34.463-33.152-34.463-33.152-83.696v-245.978q0-47.434 33.493-80.797t81.341-33.363q47.847 0 81.412 33.363 33.565 33.363 33.565 80.797v245.978q0 49.233-33.232 83.696-33.231 34.463-81.753 34.463Zm0-238.934Zm-36.282 537.377v-132.464q-108.921-12.478-181.501-93.55-72.579-81.072-72.579-190.588h72.804q0 90.007 63.611 152.116 63.611 62.109 153.862 62.109 90.252 0 153.948-62.143 63.695-62.143 63.695-152.082h72.804q0 109.573-72.579 190.616-72.58 81.044-181.501 93.506v132.48h-72.564ZM480.017-482q16.996 0 28.026-12.375 11.029-12.375 11.029-30.031v-245.957q0-16.208-11.301-27.318Q496.47-808.79 480-808.79t-27.771 11.109q-11.301 11.11-11.301 27.318v245.957q0 17.656 11.046 30.031Q463.021-482 480.017-482Z"></path></svg> <span>Subscribed Training</span></NavLink>
          <NavLink to="corporatetraining" end className="tablink">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="20px" viewBox="0 -960 960 960" ><path d="M480-406.247q-48.522 0-81.674-34.463-33.152-34.463-33.152-83.696v-245.978q0-47.434 33.493-80.797t81.341-33.363q47.847 0 81.412 33.363 33.565 33.363 33.565 80.797v245.978q0 49.233-33.232 83.696-33.231 34.463-81.753 34.463Zm0-238.934Zm-36.282 537.377v-132.464q-108.921-12.478-181.501-93.55-72.579-81.072-72.579-190.588h72.804q0 90.007 63.611 152.116 63.611 62.109 153.862 62.109 90.252 0 153.948-62.143 63.695-62.143 63.695-152.082h72.804q0 109.573-72.579 190.616-72.58 81.044-181.501 93.506v132.48h-72.564ZM480.017-482q16.996 0 28.026-12.375 11.029-12.375 11.029-30.031v-245.957q0-16.208-11.301-27.318Q496.47-808.79 480-808.79t-27.771 11.109q-11.301 11.11-11.301 27.318v245.957q0 17.656 11.046 30.031Q463.021-482 480.017-482Z"/></svg> <span> Corporate Training</span></NavLink>
          <NavLink to="masterclasses" end className="tablink"><i className="fa-solid fa-chalkboard-user"></i> <span>My Master Classes</span></NavLink>
          <NavLink to="bmlessons" end className="tablink"><i className="fa-solid fa-asterisk"></i> <span>Bookmarked Lessons</span></NavLink>
          <NavLink to="bmlabs" end className="tablink"><i className="fa-solid fa-bookmark"></i> <span>Bookmarked Labs</span></NavLink>
          <NavLink to="liveprogressreport" end className="tablink"><i className="fa-solid fa-chart-simple"></i> <span>Learning Progress</span></NavLink>
        </div>
      </div>
      <div className="tab-content">
        <Outlet />
      </div>
    </div>
  )
}


export default function Home() {
  return (
    <div>
      <h1 >Project Overview: Articles Platform</h1>
      <p>
        This is a small prototype of a blog platform built using Next.js. The application allows users to browse articles,
        register and log in, and create, edit, or delete their own articles. It also includes basic authorization
        and access control.
        <br /><br /><br />The main features include:<br /><br />
        <ul className="check-list">
          <li>User Authentication: Secure login and registration functionality.</li>
          <li>Form Validation: Validation during user registration to ensure correct input.</li>

          <li> Article List: A page that displays all published articles.</li>

          <li>Create Article: Logged-in users can add new articles using a simple form.</li>

          <li>Article View: Users can view full articles in a separate detailed view.</li>

          <li>Edit & Delete: Authors can edit or delete only their own articles.</li>

          <li>Access Control: If a user attempts to edit another author's article, they are redirected to a “Forbidden Access” page.</li>

        </ul>
      </p>
      <br /><br />
      <div>

        <hr></hr>
        <h3>Visual overview of the main features:</h3>
        

        <h4>➻ Authentication & Validation</h4>
        
        <p>✓ Login Page: A clean and simple form where existing users can enter their credentials to access their account.</p>
        <img src="img/10.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />
        
        <p>✓ Registration Page: A user-friendly sign-up form for new users to create an account.</p>
        <img src="img/2.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />
        
        <p>✓ Validation During Registration: Input validation (e.g. email format, password length)
          ensures data integrity and a smooth onboarding experience.</p>
        <img src="img/3.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />


        <h4>➻ Articles</h4>
        
        <p>✓ Article List: Displays a list of all published articles, including the title and a short preview</p>
        <img src="img/4.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />
        
        <p>✓ Add Article Page: A form where authenticated users can create a new article with a title and content.</p>
        <img src="img/5.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />
        
        <p>✓ New Article in the List: Once submitted, the newly created article instantly appears in the list, confirming
          successful creation.</p>
        <img src="img/6.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />


        <h4>➻ Article Management</h4>
        
        <p>✓ Edit Article Page: Allows authors to update the title or content of their own articles. The form is pre-filled for convenience.</p>
        <img src="img/7.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />
       
        <p>✓ Full Article View: Clicking an article from the list opens a dedicated page showing its full content, author, and creation date.</p>
        <img src="img/8.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />
        

        <h4>➻ Access Control</h4>
        
        <p>✓ Forbidden Access Page: If a user tries to edit or delete an article they didn’t create, they’re redirected here. This page clearly
          states that the action is not allowed and reinforces proper access control.</p>
        <img src="img/9.jpg" alt="Project Overview" style={{ width: '50%', height: 'auto' }} />
      
      </div>
    </div>
  );
}
import './Register.css';

export default function Register(){
    return(
    <div class="container">
        <section id="content">
            <form action="">
                <h1>Register</h1>
                <div>
                    <input type="text" required placeholder="Username" id="username" />
                </div>
                <div>
                    <input type="password" required placeholder="Password" id="password" />
                </div>
                <div>
                    <input type="password" required placeholder="Confirm Password" id="confirm_password" />
                </div>
                <div>
                    <input type="submit" value="Register" />
                 </div>
            </form>            
        </section>
    </div>
    )
}
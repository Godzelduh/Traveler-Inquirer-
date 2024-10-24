function Navbar() {
    return (
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <h1>Logo</h1>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a href="/" class="navbar-item">
                        Home
                    </a>

                    {/* <a href="/results" class="navbar-item">
                        Display Results
                    </a> */}

                    <a href="/users" class="navbar-item">
                        Display Users
                    </a>

                
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-primary">   
                                <strong>Sign up</strong>
                            </a>
                            <a href="/login" class="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
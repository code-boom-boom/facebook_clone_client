import React, {Fragment} from "react";
import useSignupUser from "./hooks/useSignupUser";
import {Button, CircularProgress, FormControl, TextField} from "@material-ui/core";

function SignupForm() {
    const {
        loading,
        error,
        handleSignupUser,
        handleNameChange,
        handleEmailChange,
        handlePasswordChange,
    } = useSignupUser();

    return (
        <Fragment>
            <form onSubmit={ handleSignupUser }>
                <FormControl style={{ width: "100%" }}>
                    <TextField
                        error={ !!(error && error.name) }
                        helperText={ error && error.name ? error.name : null }
                        onChange={ handleNameChange }
                        label="Name"
                        variant="outlined"
                        style={{ marginTop: "16px" }}
                    />
                </FormControl>

                <FormControl style={{ width: "100%" }}>
                    <TextField
                        error={ !!(error && error.email) }
                        helperText={ error && error.email ? error.email : null }
                        onChange={ handleEmailChange }
                        label="Email"
                        variant="outlined"
                        style={{ marginTop: "16px" }}
                    />
                </FormControl>

                <FormControl style={{ width: "100%" }}>
                    <TextField
                        error={ !!(error && error.password) }
                        helperText={ error && error.password ? error.password : null }
                        onChange={ handlePasswordChange }
                        label="Password"
                        variant="outlined"
                        style={{ marginTop: "16px" }}
                        type="password"
                    />
                </FormControl>

                <Button
                    type="submit"
                    disabled={ loading }
                    style={{
                        width: "100%",
                        background: "rgb(24, 119, 242)",
                        color: "#fff",
                        marginTop: "16px"
                    }}
                    variant="contained"
                >
                    { loading ? (
                        <CircularProgress variant="indeterminate" size={ 25 } style={{ color: "#fff" }} />
                    ) : (
                        "Sign Up"
                    ) }
                </Button>
            </form>
        </Fragment>
    );
}

export default SignupForm;
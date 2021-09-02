import React, { Fragment } from "react";
import useLoginUser from "./hooks/useLoginUser";
import {
    Button,
    CircularProgress,
    FormControl,
    TextField
} from "@material-ui/core";

function LoginForm() {
    const {
        loading,
        error,
        handleLoginUser,
        handlePasswordChange,
        handleEmailChange
    } = useLoginUser();

    return (
        <Fragment>
            <form onSubmit={ handleLoginUser }>
                <FormControl style={{ width: "100%" }}>
                    <TextField
                        onChange={ handleEmailChange }
                        label="Email"
                        variant="outlined"
                        error={ !!(error && error.email) }
                        helperText={ error && error.email ? error.email : null }
                    />
                </FormControl>

                <FormControl style={{ width: "100%" }}>
                    <TextField
                        onChange={ handlePasswordChange }
                        type="password"
                        style={{ marginTop: "16px" }}
                        label="Password"
                        variant="outlined"
                        error={ !!(error && error.password) }
                        helperText={ error && error.password ? error.password : null }
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
                        "Log In"
                    ) }
                </Button>
            </form>
        </Fragment>
    );
}

export default LoginForm;
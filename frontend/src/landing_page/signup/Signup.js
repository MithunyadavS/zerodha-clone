
import React from "react";
import { Link } from "react-router-dom";

function Signup() {
    return (
        <div className="container mt-5 mb-5">
            <div className="row align-items-center">

                {/* Left section */}
                <div className="col-lg-6 text-center mb-4 mb-lg-0">
                    <img
                        src="https://zerodha.com/static/images/account_open.svg"
                        alt="Open a Zerodha account"
                        className="img-fluid"
                        style={{ maxWidth: "450px" }}
                    />
                </div>

                {/* Right section */}
                <div className="col-lg-6">
                    <h1 className="mb-3">
                        Open a free demat and trading account online
                    </h1>

                    <p className="text-muted mb-4">
                        Start investing in stocks, derivatives, mutual funds
                        and more with our simple trading platform.
                    </p>

                    <div className="mb-4">
                        <label
                            htmlFor="mobileNumber"
                            className="form-label"
                        >
                            Mobile number
                        </label>

                        <div className="input-group">
                            <span className="input-group-text">+91</span>

                            <input
                                type="tel"
                                id="mobileNumber"
                                className="form-control"
                                placeholder="Enter your mobile number"
                                maxLength="10"
                            />
                        </div>

                        <small className="text-muted">
                            You will receive an OTP to verify your number.
                        </small>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary btn-lg mb-3"
                        onClick={() => {
                            alert(
                                "Signup functionality will be connected later."
                            );
                        }}
                    >
                        Continue
                    </button>

                    <p className="text-muted small">
                        By proceeding, you agree to the terms and conditions.
                    </p>

                    <p>
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;

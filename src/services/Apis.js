const BASE_URL = process.env.REACT_APP_BASE_URL;

export const auth = {
    login_api: BASE_URL + "/auth/login",
    signup_api: BASE_URL + "/auth/signup",
    sendotp_api: BASE_URL + "/auth/send-otp",
    generate_reset_password_token_api: BASE_URL + "/auth/reset-password-token",
    reset_password_api: BASE_URL + "/auth/reset-password",
    change_password_api: BASE_URL + "/auth/change-password"
}

export const profile = {
    update_dp_api: BASE_URL + "/profile/update-dp",
    update_profile_api: BASE_URL + "/profile/update-profile",
    delete_user_api: BASE_URL + "/profile/delete-account",
    get_user_details_api: BASE_URL + "/profile/get-user-details"
}

export const course = {
    // category api's
    get_all_categories_api: BASE_URL + "/course/get-all-category",
    // category api's
    create_course_review_api: BASE_URL + "/course/create-rating-and-review",
    // courses api's
    get_all_courses_api: BASE_URL + "/course/get-all-courses",
    get_course_details_api: BASE_URL + "/course/get-course-details",
    create_courses_api: BASE_URL + "/course/create-course",
    update_courses_api: BASE_URL + "/course/edit-course",
    fetch_instructor_courses_api: BASE_URL + "/course/instructor-courses",
    delete_courses_api: BASE_URL + "/course/delete-course",
    // section api's
    create_section_api: BASE_URL + "/course/create-section",
    update_section_api: BASE_URL + "/course/update-section",
    delete_section_api: BASE_URL + "/course/delete-section",
    // sub-section api's
    create_sub_section_api: BASE_URL + "/course/create-sub-section",
    update_sub_section_api: BASE_URL + "/course/update-sub-section",
    delete_sub_section_api: BASE_URL + "/course/delete-sub-section",
}


export const payment = {
    capture_payment_api: BASE_URL + "/payment/capture-payment",
    verify_payment_api: BASE_URL + "/payment/verify-payment",
    send_payment_success_email_api: BASE_URL + "/payment/send-payment-success-email",
}

export const contactus = {
    contact_us_api: BASE_URL + "/reach/contact",
  }
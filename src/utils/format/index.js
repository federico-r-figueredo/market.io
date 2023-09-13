module.exports = {
    format: (payload, failure = false) =>
        failure
            ? {
                  success: false,
                  error: payload,
                  payload: null
              }
            : {
                  success: true,
                  errors: [],
                  payload
              }
};

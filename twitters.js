const twitters = (api, user_id, params = { cursor: -1, usernames: [] }) =>
  api
    .get("followers/list", {
      user_id,
      count: 200,
      cursor: params.cursor,
    })
    .then(({ data }) => data)
    .then(({ next_cursor, users }) =>
      next_cursor
        ? twitters(api, user_id, {
            cursor: next_cursor,
            usernames: [
              ...params.usernames,
              ...users.map(({ screen_name }) => screen_name),
            ],
          })
        : [...params.usernames, ...users.map(({ screen_name }) => screen_name)]
    );

module.exports.twitters = twitters;

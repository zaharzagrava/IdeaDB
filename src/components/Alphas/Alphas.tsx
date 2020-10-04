import React, { ReactElement, useState } from 'react';
import axios from 'axios';
interface Props {}

function Alphas({}: Props): ReactElement {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <button
        onClick={async (event) => {
          const response = await axios(
            'https://jsonplaceholder.typicode.com/users'
          );

          setUsers(response.data);
        }}
      >
        Load
      </button>
      {users.map((user) => {
        return <>{JSON.stringify(user)}</>;
      })}
    </div>
  );
}

export default Alphas;

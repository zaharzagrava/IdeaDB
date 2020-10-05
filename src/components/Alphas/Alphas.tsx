import React, { ReactElement, useState } from 'react';
import axios from 'axios';
export interface Props {
  delta: number;
}

function Alphas({ delta }: Props): ReactElement {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <h1>{delta}</h1>
      <button
        onClick={async (event) => {
          setUsers([]);

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

import React, {useState} from 'react';

const AuthCommonForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitForm = function(e) {
         e.preventDefault();
         props.onSubmit({email, password});
    }

    return (
        <div className="row">
            <form className="col s6" onSubmit={onSubmitForm}>
               <div className="input-field">
                  <label className="active">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} />
               </div>
               <div className="input-field">
                  <label className="active">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
               </div>
               <div>
                   {props.errors.map(error => <div key={error}>{error}</div>)}
               </div>
               <button className="btn">Submit</button>
            </form>
        </div>
    )
}

export default AuthCommonForm;
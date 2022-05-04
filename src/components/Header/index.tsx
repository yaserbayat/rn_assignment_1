import React, {FC} from 'react';
import Link from "components/Link";
import Button from "components/Button";

interface IHeader {
  onLogOut: () => void;
  isLogin: boolean;
  isAdmin: boolean;
}

const Header: FC<IHeader> = (props) => {
    const {onLogOut, isAdmin, isLogin} = props;
    return (
      <header className='bg-black fw-bold px-3 py-2'>
        <div className="container d-flex justify-content-between">
          {isLogin ? (
            <>
              <nav className='navbar d-flex flex-column flex-sm-row'>
                {isAdmin && (
                  <>
                    <Link className='me-2 text-light' to='/assessments' title='Assessments'/>
                    <Link className='me-2 text-light' to='/questionTypes' title='QuestionTypes'/>
                  </>
                )}
                <Link className='me-2 text-light' to='/assessmentsKits' title='Assessments Kits'/>
              </nav>
              <Button
                type={"reset"}
                className='btn-secondary align-self-center'
                onClick={onLogOut}
                title='Log out'
              />
            </>
          ) : (
            <h3>welcome here</h3>
          )}
        </div>
      </header>
    );
  };

export default Header;
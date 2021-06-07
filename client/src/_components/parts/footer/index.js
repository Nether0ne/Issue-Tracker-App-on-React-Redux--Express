import React from 'react';

import "./footer.sass";

export class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return(
      <div className="flex h-12 bg-gray-300">
        <div className="m-auto text-center">
          Made by <a href="https://github.com/Nether0ne" className="font-bold">nether</a> 
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-footer h-5 w-5 text-red-500 fill-current" fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>        
      </div>
    )
  }
};

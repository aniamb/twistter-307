import React, {Component} from 'react';
import './App.css';
import './Timeline';

class Search extends Component{
    render() {
        // Use the same div logic as timeline. Instead of putting in tweets put in usernames
        // The usernames should also be able to link to their profile
        return (
            <div className="Search">
                THIS IS SEARCH
                <br/>
                {this.props.location.state.list}
                <br/>
                {["test", "123"]}
            </div>

        );
    }

}

export default Search
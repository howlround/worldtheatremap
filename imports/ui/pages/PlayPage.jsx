import React from 'react';
import classnames from 'classnames';
// import ListHeader from '../components/ListHeader.jsx';
// import TodoItem from '../components/TodoItem.jsx';
import Play from '../components/Play.jsx';
import PlayEdit from '../components/PlayEdit.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import Message from '../components/Message.jsx';
import Modal from '../components/Modal.jsx';

export default class PlayPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: null,
    };
    this.onEditingChange = this.onEditingChange.bind(this);
  }

  onEditingChange(id, editing) {
    this.setState({
      editing: editing ? id : null,
    });
  }

  render() {
    // const { play, playExists, loading } = this.props;
    const { play, user } = this.props;
    const { editing } = this.state;

    const playPageClass = classnames({
      'page': true,
      'plays-show': true,
      editing,
    });

    if (!play) {
      return (
        <NotFoundPage/>
      );
    }
    else if (editing && user) {
      return (
        <div className="overlay-wrapper">
          <Modal/>
          <div className={playPageClass}>
            <PlayEdit
              play={play}
              onEditingChange={this.onEditingChange}
            />
          </div>
        </div>
      );
    }
    else {
      return (
        <div className={playPageClass}>
          <Play
            play={play}
            user={user}
            onEditingChange={this.onEditingChange}
          />
        </div>
      );
    }
  }
}

PlayPage.propTypes = {
  play: React.PropTypes.object,
  user: React.PropTypes.object,
  // loading: React.PropTypes.bool,
  // playExists: React.PropTypes.bool,
};

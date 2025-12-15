import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onIsComplete, onRemoveTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => {
          onIsComplete(id);
        }}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={() => {
          onRemoveTask(id);
        }}>
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onIsComplete: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
};

export default Task;

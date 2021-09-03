/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Component, MouseEvent, ReactNode } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>): void => {
    if (!(event.target instanceof HTMLElement) || !event.target.dataset.index) {
      return;
    }
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render(): ReactNode {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

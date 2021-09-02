import React from "react";
import { Direction } from "../models/Direction";

type Props = {
  direction: Direction;
  index: number;
};

export function RecipeDirectionWidget(props: Props) {
  const { direction, index } = props;

  return (
    <div className="recipe-direction-widget" key={index}>
      <div className="step-no">
        Step #{index + 1}
        {direction.optional ? <span className="optional">Optional</span> : null}
      </div>

      <div className="instructions">{direction.instructions}</div>
    </div>
  );
}

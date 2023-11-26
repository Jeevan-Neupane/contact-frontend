import React, { useEffect, useRef, useState } from "react";
import { AddContactDiv, AddIconDiv } from "./style";
import { IoPersonAddSharp } from "react-icons/io5";

function AddContact() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(null);

  const onArrowClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const arrow = ref.current;
    const scroll = () => {
      setScrollY(window.scrollY);
    };

    if (scrollY < 300) {
      arrow.style.display = "none";
    } else {
      arrow.style.display = "block";
    }

    if (scrollY < 300) {
    }

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [scrollY]);
  return (
    <AddContactDiv
      ref={ref}
      onClick={onArrowClick}
    >
      <AddIconDiv>
        <IoPersonAddSharp />
      </AddIconDiv>
    </AddContactDiv>
  );
}

export default AddContact;

/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { plantsActions } from "../../store/plants/plantsSlice";
import { getPlants } from "../../store/plants/plantsAction";

import styles from "./Register.module.css";

import ButtonForm from "../../components/UI/Form/ButtonForm/ButtonForm";

import plant from "../../assets//plantForm.svg";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import ErrosForm from "../../components/ErrosForm/ErrosForm";
import { useState } from "react";

import image1 from "../../assets/plants.png";
import image2 from "../../assets/plants2.png";
import image3 from "../../assets/plants3.png";
import image4 from "../../assets/plants4.png";

const getRandomImage = () => {
  const images = [image1, image2, image3, image4];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

const schema = yup
  .object({
    name: yup
      .string()
      .required("Name it is a mandatory field")
      .min(5, "Name must have at least 5 characters")
      .matches(/^[^\d]+$/, "Name must not contain numbers"),
    subtitle: yup
      .string()
      .required("Subtitle it is a mandatory field")
      .min(5, "Subtitle must have at least 5 characters"),
    price: yup
      .number()
      .positive()
      .required("Price it is a mandatory field")
      .typeError("Enter a valid number")
      .min(1),
    description: yup
      .string()
      .required("Description it is a mandatory field")
      .min(5)
      .max(99),
    discountPercentage: yup
      .string()
      .matches(/^\d*\.?\d+$/, "Discount Percentage must not contain numbers"),
    features: yup
      .string()
      .required("Features it is a mandatory field")
      .min(5, "Features must have at least 5 characters"),
    plantType: yup
      .string()
      .required("Plant Type it is a mandatory field")
      .min(5, "Plant Type must have at least 5 characters")
      .matches(/^[^\d]+$/, "Plant Type must not contain numbers"),
  })
  .required();

const Register = () => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState("indoor");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema)});

  async function updateStatePlants() {
    const data = await getPlants();
    dispatch(plantsActions.handleGetPlants(data));
  }

  const handleSubmitForm = (data) => {
    let isInSale;

    console.log(data)
    const {
      description,
      discountPercentage,
      features,
      labelDoor,
      name,
      plantType,
      price,
      subtitle,
    } = data;

    if (discountPercentage > 0) {
      isInSale = "promo";
    } else {
      isInSale = "notPromo";
    }

    const plantsObject = {
      name: name,
      subtitle: subtitle,
      label: [plantType, labelDoor],
      isInSale,
      price: price,
      discountPercentage: discountPercentage,
      features: features,
      description: description,
      img: getRandomImage(),
    };

    fetch("http://localhost:3000/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(plantsObject),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form submitted successfully");

          updateStatePlants();
        } else {
          throw new Error("Failed to submit form");
        }
      })
      .catch((error) => {
        console.error("Form submission error:", error);
      });
  };

  return (
    <>
      <section className={styles.registerContainer}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className={styles.formContainer}
        >
          <h2 className={styles.registerTitle}>Plant Registration</h2>

          <div className={styles.plantsNamesControl}>
            <p className={styles.inputContainer}>
              <label className={styles.inputLabel}>Plant Name</label>
              <input
                id="name"
                type="text"
                placeholder="Echinocereus Cactus"
                className={styles.inputForm}
                {...register("name")}
              />

              <ErrosForm errors={errors?.name?.message} />
            </p>

            <p className={styles.inputContainer}>
              <label className={styles.inputLabel}>Plant Subtitle</label>
              <input
                id="subtitle"
                type="text"
                placeholder="A majestic addition to your plant collection"
                className={styles.inputForm}
                {...register("subtitle")}
              />

              <ErrosForm errors={errors?.subtitle?.message} />
            </p>
          </div>

          <p className={styles.inputContainer}>
            <label className={styles.inputLabel}>Plant Type</label>
            <input
              id="type"
              type="text"
              placeholder="Cactus"
              className={styles.inputForm}
              {...register("plantType")}
            />

            <ErrosForm errors={errors?.plantType?.message} />
          </p>

          {/* <label className={styles.inputLabel}>Discount percentage</label> */}

          <div className={styles.inputContainer}>
            <p className={styles.halfInputsContainer}>
              <div>
                <label className={styles.inputLabel}>Price</label>
                <input
                  id="price"
                  type="number"
                  placeholder="$139.99"
                  className={`${styles.inputForm} ${styles.halfInput}`}
                  step="0.01"
                  {...register("price")}
                />
                <ErrosForm errors={errors?.price?.message} />
              </div>

              <div>
                <label className={styles.inputLabel}>Discont Percentage</label>
                <input
                  id="discountPercentage"
                  type="number"
                  placeholder="20%"
                  step="0.01"
                  className={`${styles.inputForm} ${styles.halfInput}`}
                  {...register("discountPercentage")}
                />

                <ErrosForm errors={errors?.discountPercentage?.message} />
              </div>
            </p>
          </div>

          <div>
            <h3 className={styles.labelRadios}>Label:</h3>
            <div className={styles.inputRadioControl}>
              <p className={styles.inputRadioContainer}>
                <input
                  id="indoor"
                  type="radio"
                  value="indoor"
                  {...register("labelDoor")}
                  className={styles.inputRadio}
                  checked={label === "indoor"}
                  onChange={() => setLabel("indoor")}
                />
                <label
                  className={`${styles.inputRadioLabel} ${
                    label ? styles.checkedLabel : ""
                  }`}
                >
                  indoor
                </label>
              </p>
              <p className={styles.inputRadioContainer}>
                <input
                  id="outdoor"
                  type="radio"
                  {...register("labelDoor")}
                  checked={label === "outdoor"}
                  value="outdoor"
                  className={styles.inputRadio}
                  onChange={() => setLabel("outdoor")}
                />
                <label
                  className={`${styles.inputRadioLabel} ${
                    label ? styles.checkedLabel : ""
                  }`}
                >
                  outdoor
                </label>
              </p>
            </div>
          </div>

          <div className={styles.textareaControl}>
            <p className={styles.inputContainer}>
              <label className={styles.inputLabel}>Features</label>
              <textarea
                id="feature"
                {...register("features")}
                placeholder="Species: Echinocereus..."
                className={styles.inputTextarea}
              />
              <ErrosForm errors={errors?.features?.message} />
            </p>

            <p className={styles.inputContainer}>
              <label className={styles.inputLabel}>Description</label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Ladyfinger cactus..."
                className={styles.inputTextarea}
              />
              <ErrosForm errors={errors?.description?.message} />
            </p>
          </div>
          <ButtonForm type="submit">Register</ButtonForm>
        </form>
        <figure id={styles.img}>
          <img src={plant} />
        </figure>
      </section>
    </>
  );
};

export default Register;

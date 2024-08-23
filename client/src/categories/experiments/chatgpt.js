import { useForm } from "react-hook-form";

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <input
            type="checkbox"
            {...register("options", {
              validate: (value) => value && value.length > 0 || "At least one option must be selected"
            })}
            value="option1"
          />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            {...register("options")}
            value="option2"
          />
          Option 2
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            {...register("options")}
            value="option3"
          />
          Option 3
        </label>
      </div>

      {errors.options && <p>{errors.options.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;

import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import styles from "../../App.module.css";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

const initialForm: RegisterForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegisterForm(form: RegisterForm) {
  const errors: RegisterErrors = {};

  if (!form.name.trim()) {
    errors.name = "Введите имя";
  }

  if (!form.email.trim()) {
    errors.email = "Введите email";
  } else if (!emailPattern.test(form.email)) {
    errors.email = "Введите корректный email";
  }

  if (!form.password) {
    errors.password = "Введите пароль";
  } else if (form.password.length < 6) {
    errors.password = "Пароль должен быть минимум 6 символов";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Повторите пароль";
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Пароли не совпадают";
  }

  return errors;
}

function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const navigate = useNavigate();

  const handleChange =
    (field: keyof RegisterForm) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((currentForm) => ({
        ...currentForm,
        [field]: event.target.value,
      }));
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateRegisterForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    navigate("/login");
  };

  return (
    <main className={`${styles.page} ${styles["auth-page"]}`}>
      <section className={styles["auth-card"]}>
        <h1>Регистрация</h1>

        <form className={styles["auth-form"]} onSubmit={handleSubmit} noValidate>
          <Input
            label="Имя"
            name="name"
            value={form.name}
            onChange={handleChange("name")}
            error={errors.name}
            placeholder="Анна Иванова"
            autoComplete="name"
          />
          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange("email")}
            error={errors.email}
            placeholder="name@example.com"
            type="email"
            autoComplete="email"
          />
          <Input
            label="Пароль"
            name="password"
            value={form.password}
            onChange={handleChange("password")}
            error={errors.password}
            placeholder="Минимум 6 символов"
            type="password"
            autoComplete="new-password"
          />
          <Input
            label="Повтор пароля"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
            placeholder="Повторите пароль"
            type="password"
            autoComplete="new-password"
          />

          <Button type="submit">Зарегистрироваться</Button>
        </form>

        <p className={styles["auth-card__footer"]}>
          <Link to="/login">Войти</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;

import heroImg from './assets/hero.png'
import Accordion from './components/Accordion/Accordion'
import Badge from './components/Badge/Badge'
import Button from './components/Button/Button'
import Card from './components/Card/Card'
import Header from './components/Header/Header'
import Input from './components/Input/Input'
import Modal from './components/Modal/Modal'
import Select from './components/Select/Select'
import Switch from './components/Switch/Switch'
import Tabs from './components/Tabs/Tabs'
import './App.css'

const navigation = [
  { label: 'Компоненты', href: '#components' },
  { label: 'Формы', href: '#forms' },
  { label: 'Состояния', href: '#states' },
]

const selectOptions = [
  { value: 'starter', label: 'Starter' },
  { value: 'team', label: 'Team' },
  { value: 'business', label: 'Business' },
]

const accordionItems = [
  {
    question: 'Почему компоненты лежат в отдельных папках?',
    answer:
      'Так проще найти код компонента и его стили. Для учебного проекта это понятная и аккуратная структура.',
  },
  {
    question: 'Зачем нужны Props?',
    answer:
      'Props позволяют передавать данные в компонент снаружи: текст, варианты, список опций или состояние disabled.',
  },
  {
    question: 'Почему стили написаны обычным CSS?',
    answer:
      'Так видно, какие классы используются в JSX и как они влияют на внешний вид без магии CSS-фреймворков.',
  },
]

const tabs = [
  {
    title: 'Описание',
    content: (
      <p>
        Компоненты используют простые Props и подходят для небольшой учебной
        дизайн-системы.
      </p>
    ),
  },
  {
    title: 'Состояния',
    content: (
      <p>
        Для интерактивных элементов добавлены hover, active, disabled и
        focus-visible состояния.
      </p>
    ),
  },
  {
    title: 'Адаптивность',
    content: (
      <p>
        Сетка витрины и крупные блоки перестраиваются на мобильном экране.
      </p>
    ),
  },
]

function App() {
  return (
    <div className="app" id="top">
      <Header logo="Plus Kit" navItems={navigation} buttonText="Начать" />

      <main>
        <section className="hero-section">
          <p className="eyebrow">React + TypeScript + CSS</p>
          <h1>Витрина UI-компонентов</h1>
          <p className="hero-section__text">
            Небольшой набор из 10 компонентов: без UI-библиотек, без
            CSS-фреймворков и без сложной архитектуры.
          </p>
        </section>

        <div className="showcase" id="components">
          <section className="component-section">
            <div className="section-heading">
              <span className="section-heading__number">01</span>
              <h2>Button</h2>
            </div>
            <div className="demo-row">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          <section className="component-section">
            <div className="section-heading">
              <span className="section-heading__number">02</span>
              <h2>Badge</h2>
            </div>
            <div className="demo-row">
              <Badge text="Default" />
              <Badge text="Success" variant="success" />
              <Badge text="Warning" variant="warning" />
              <Badge text="Danger" variant="danger" />
            </div>
          </section>

          <section className="component-section" id="forms">
            <div className="section-heading">
              <span className="section-heading__number">03</span>
              <h2>Input</h2>
            </div>
            <div className="demo-grid demo-grid--three">
              <Input label="Имя" placeholder="Анна Иванова" />
              <Input
                error="Введите корректный email"
                label="Email"
                placeholder="name@example.com"
                type="email"
              />
              <Input disabled label="Город" placeholder="Недоступно" />
            </div>
          </section>

          <section className="component-section">
            <div className="section-heading">
              <span className="section-heading__number">04</span>
              <h2>Select</h2>
            </div>
            <div className="demo-grid demo-grid--two">
              <Select label="Тариф" options={selectOptions} />
              <Select disabled label="Архивный тариф" options={selectOptions} />
            </div>
          </section>

          <section className="component-section" id="states">
            <div className="section-heading">
              <span className="section-heading__number">05</span>
              <h2>Switch</h2>
            </div>
            <div className="demo-column">
              <Switch defaultChecked label="Уведомления" />
              <Switch label="Публичный профиль" />
              <Switch disabled label="Синхронизация" />
            </div>
          </section>

          <section className="component-section">
            <div className="section-heading">
              <span className="section-heading__number">06</span>
              <h2>Card</h2>
            </div>
            <Card
              badgeText="New"
              badgeVariant="success"
              buttonText="Подробнее"
              description="Карточка объединяет изображение, заголовок, описание, бейдж и кнопку действия."
              image={heroImg}
              title="Компонент Card"
            />
          </section>

          <section className="component-section component-section--wide">
            <div className="section-heading">
              <span className="section-heading__number">07</span>
              <h2>Header</h2>
            </div>
            <Header
              buttonText="Войти"
              logo="Demo"
              navItems={[
                { label: 'Главная', href: '#top' },
                { label: 'Каталог', href: '#components' },
                { label: 'Контакты', href: '#forms' },
              ]}
            />
          </section>

          <section className="component-section component-section--wide">
            <div className="section-heading">
              <span className="section-heading__number">08</span>
              <h2>Accordion</h2>
            </div>
            <Accordion items={accordionItems} />
          </section>

          <section className="component-section component-section--wide">
            <div className="section-heading">
              <span className="section-heading__number">09</span>
              <h2>Tabs</h2>
            </div>
            <Tabs tabs={tabs} />
          </section>

          <section className="component-section">
            <div className="section-heading">
              <span className="section-heading__number">10</span>
              <h2>Modal</h2>
            </div>
            <Modal buttonText="Открыть окно" title="Модальное окно">
              <p>
                Это простое модальное окно закрывается по кнопке и по клику на
                затемненный фон.
              </p>
            </Modal>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App

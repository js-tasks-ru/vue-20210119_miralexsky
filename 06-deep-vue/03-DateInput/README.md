# DateInput

🔥 _Задача повышенной сложности_<br>
💼 _Часть проекта_

В HTML значение `value` у полей ввода всегда строка, даже если оно имеет `type="number"` или `type="date"`. Во Vue есть стандартный модификатор `.number` у `v-model`, который позволяет работать с введённым значением, как с числом. Однако такого же модификатора для работы с `date` нет.

В HTML также есть особые типа полей ввода для ввода даты и времени. Они позволяют пользователю вводить дату и/или время. Но работать с их строковым значением `value` в дальнейшем неудобно.

Требуется разработать компонент `DateInput`, являющийся `TransparentWrapper` обёрткой над `AppInput`, который бы упрощал работу с полями ввода даты и времени:
- Новые входные параметры компонента:
    - `type` - тип поля ввода (`'date' | 'time' | 'datetime-local'`), по умолчанию `date`;
    - `valueAsNumber` - значение поля ввода числовым представлением даты;
    - `valueAsDate` - значение поля ввода с выбранной датой типом `Date`;
- Значение поля ввода должно определяться параметрами `valueAsNumber` или `valueAsDate` и соответствовать требуемому формату полей [date](https://developer.mozilla.org/en/docs/Web/HTML/Element/input/date), [time](https://developer.mozilla.org/en/docs/Web/HTML/Element/input/time), [datetime-local](https://developer.mozilla.org/en/docs/Web/HTML/Element/input/datetime-local);
- Если переданы оба параметра `valueAsNumber` и `valueAsDate`, то предпочтение отдаётся `valueAsNumber`;
- Если ни один из `valueAsDate` и `valueAsNumber` не передан, в качестве значения поля ввода устанавливается атрибут `value` как есть;
- При вводе параметры `valueAsDate` и `valueAsNumber` синхронизируются через `.sync` модификатор соответствующими событиями;
- Компонент является прозрачной обёрткой (`TransparentWrapper`) над компонентом `AppInput`, и передаёт на него все его атрибуты, параметры, обработчики событий.

Для получения текущего значения поля ввода как даты и числа предлагается использовать соответствующие свойства полей ввода даты и времени: [valueAsDate и valueAsNumber](https://developer.mozilla.org/en/docs/Web/API/HTMLInputElement).

Помните, что `valueAsDate` и `valueAsNumber` возвращают и ожидают дату в UTC, а не часовом поясе пользователя.

Также обратите внимание, что у `input[type=datetime-local]` нет `valueAsDate`, а есть только `valueAsNumber`. Требуется также обновлять `valueAsDate`, но брать его значение из `valueAsNumber`.

Результат:

<img src="https://i.imgur.com/kKfRYh2.gif" alt="Example" />

---

### Инструкция

📝 Для решения задачи отредактируйте файл: `components/DateInput.vue`.

🚀 Команда запуска для ручного тестирования: `npm run serve`;<br>
приложение будет доступно на [http://localhost:8080/06-deep-vue/03-DateInput](http://localhost:8080/06-deep-vue/03-DateInput).

✅ Доступно автоматическое тестирование: `npm test DateInput`.

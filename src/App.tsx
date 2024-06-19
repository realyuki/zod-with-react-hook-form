import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(1, { message: '이름은 필수값입니다.' }),
  age: z
    .number({
      invalid_type_error: '나이는 필수값입니다.',
    })
    .min(1, { message: '나이는 1살부터 입력이 가능합니다.' }),
});

// schema.parse({
//   name: '111',
//   age: '0'
// })

type InputType = z.infer<typeof schema>

import z from 'zod';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      age: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit((e) => console.log(e))}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요."
          {...register('name')}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="name">Age</label>
        <input
          type="number"
          id="age"
          placeholder="나이를 입력해주세요."
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <input type="submit" />
    </form>
  )
}

export default App

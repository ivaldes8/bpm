import Button from '@/components/Base/Button';
import Lucide from '@/components/Base/Lucide';
import InputField from '@/custom-components/FormElements/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Props = {
    onFilter: (filter: any) => void
}

const PolicyFilters = ({ onFilter }: Props) => {

    const defaultValue = {
        policy: "",
        dni: "",
        secuencialDni: ""
    }

    const searchSchema = () => yup.object().shape(
        {
            policy: yup.string(),
            dni: yup.string(),
            secuencialDni: yup.string()
        }
    )

    const {
        handleSubmit,
        control,
        reset
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(searchSchema()),
        defaultValues: defaultValue
    });

    const onResetFilter = () => {
        reset(defaultValue);
        onFilter(defaultValue);
    }

    const onSearch = async (data: any) => {
        onFilter(data);
    }

    return (
        <form
            className="flex flex-col sm:flex-row gap-0 sm:gap-4 mb-2"
            onSubmit={handleSubmit(onSearch)}>

            <InputField
                control={control}
                name="policy"
                label="indentifier"
                placeholder="Identificador ..."
            />

            <InputField
                control={control}
                name="dni"
                label="dni"
                placeholder="DNI ..."
            />

            <InputField
                control={control}
                name="dni"
                label="secuencialDni"
                placeholder="DNI secuencial ..."
            />

            <div className='flex-1 flex justify-center sm:justify-end items-center pt-2 gap-2'>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit(onSearch)}
                >
                    <Lucide icon="Search" className="w-6 h-6" />
                </Button>
                <Button
                    variant="secondary"
                    type="reset"
                    onClick={onResetFilter}
                >
                    <Lucide icon="Eraser" className="w-6 h-6" />
                </Button>
            </div>
        </form>
    )
}

export default PolicyFilters
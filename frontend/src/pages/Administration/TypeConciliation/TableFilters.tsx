import Button from '@/components/Base/Button';
import { FormInput, FormSelect } from '@/components/Base/Form';
import { Menu } from '@/components/Base/Headless';
import Lucide from '@/components/Base/Lucide';
import { useTranslation } from 'react-i18next';

type Props = {
    filter: any,
    setFilter: (filter: any) => void,
    onFilter: () => void
    onResetFilter: () => void,
    onPrint: () => void,
    onExportCsv: () => void,
    onExportJson: () => void,
    onExportXlsx: () => void,
    onExportHtml: () => void
}

const TableFilters = ({ filter, setFilter, onFilter, onResetFilter, onPrint, onExportCsv, onExportJson, onExportXlsx, onExportHtml }: Props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
            <form
                id="tabulator-html-filter-form"
                className="xl:flex sm:mr-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    onFilter()
                }}
            >
                <div className="items-center sm:flex sm:mr-4">
                    <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                        {t("column")}
                    </label>
                    <FormSelect
                        id="tabulator-html-filter-field"
                        value={filter.field}
                        onChange={(e) => {
                            if (setFilter)
                                setFilter({
                                    ...filter,
                                    field: e.target.value,
                                });
                        }}
                        className="w-full mt-2 2xl:w-full sm:mt-0 sm:w-auto"
                    >
                        <option value="Nombre">{t("name")}</option>

                    </FormSelect>
                </div>
                <div className="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                    <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                        {t("type")}
                    </label>
                    <FormSelect
                        id="tabulator-html-filter-type"
                        value={filter.type}
                        onChange={(e) => {
                            if (setFilter)
                                setFilter({
                                    ...filter,
                                    type: e.target.value,
                                });
                        }}
                        className="w-full mt-2 sm:mt-0 sm:w-auto"
                    >
                        <option value="like">like</option>
                        <option value="=">=</option>
                        <option value="<">&lt;</option>
                        <option value="<=">&lt;=</option>
                        <option value=">">&gt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="!=">!=</option>
                    </FormSelect>
                </div>
                <div className="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
                    <label className="flex-none w-12 mr-2 xl:w-auto xl:flex-initial">
                        {t("value")}
                    </label>
                    <FormInput
                        id="tabulator-html-filter-value"
                        value={filter.value ?? null}
                        onChange={(e: any) => {
                            if (setFilter)
                                setFilter({
                                    ...filter,
                                    value: e.target.value,
                                });
                        }}
                        type="text"
                        className="mt-2 sm:w-40 2xl:w-full sm:mt-0"
                        placeholder="Search..."
                    />
                </div>
                <div className="mt-0 xl:mt-0">
                    <Button
                        id="tabulator-html-filter-go"
                        variant="primary"
                        type="button"
                        onClick={onFilter}
                    >
                        <Lucide icon="Search" className="w-4 h-4" />
                    </Button>
                    <Button
                        id="tabulator-html-filter-reset"
                        variant="secondary"
                        type="button"
                        className="mx-1"
                        onClick={onResetFilter}
                    >
                        <Lucide icon="Eraser" className="w-4 h-4" />
                    </Button>
                </div>
            </form>
            <div className="flex mt-5 sm:mt-0">
                <Button
                    id="tabulator-print"
                    variant="outline-secondary"
                    className="w-1/2 mr-2 sm:w-auto"
                    onClick={onPrint}
                >
                    <Lucide icon="Printer" className="w-4 h-4" />
                </Button>
                <Menu className="w-1/2 sm:w-auto">
                    <Menu.Button
                        as={Button}
                        variant="outline-secondary"
                        className="w-full sm:w-auto"
                    >
                        <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")}
                        <Lucide
                            icon="ChevronDown"
                            className="w-4 h-4 ml-auto sm:ml-2"
                        />
                    </Menu.Button>
                    <Menu.Items className="w-40">
                        <Menu.Item onClick={onExportCsv}>
                            <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} CSV
                        </Menu.Item>
                        <Menu.Item onClick={onExportJson}>
                            <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} JSON
                        </Menu.Item>
                        <Menu.Item onClick={onExportXlsx}>
                            <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} XLSX
                        </Menu.Item>
                        <Menu.Item onClick={onExportHtml}>
                            <Lucide icon="FileText" className="w-4 h-4 mr-2" /> {t("export")} HTML
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>
        </div>
    )
}

export default TableFilters
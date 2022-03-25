import DefaultTemplate from './DefaultTemplate';
import TemplateA from './TemplateA/TemplateA';
import TemplateB from './TemplateB/TemplateB';
import TemplateC from './TemplateC/TemplateC';

export const TEMPLATE_TYPES = {
    DefaultTemplate: 0,
    TemplateA: 1,
    TemplateB: 2,
    TemplateC: 3,
};

export const TemplateComponents = {
    [TEMPLATE_TYPES.DefaultTemplate]: (commercial) => (
        <DefaultTemplate commercial={commercial} />
    ),
    [TEMPLATE_TYPES.TemplateA]: (commercial) => (
        <TemplateA commercial={commercial} />
    ),
    [TEMPLATE_TYPES.TemplateB]: (commercial) => (
        <TemplateB commercial={commercial} />
    ),
    [TEMPLATE_TYPES.TemplateC]: (commercial) => (
        <TemplateC commercial={commercial} />
    ),
};

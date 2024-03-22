export const prepareForComboField = <
  Option extends object,
  ValueField extends keyof Option,
  LabelField extends keyof Option,
>(
  options: Option[],
  valueField: ValueField,
  labelField: LabelField,
) => {
  return options.map((option) => {
    const { [valueField]: value, [labelField]: label, ...rest } = option;

    return { value, label: String(label), ...rest };
  });
};

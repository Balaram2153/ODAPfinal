import React from 'react';
import Select from 'react-select';

const SubtestsDropdown = ({ subtests, selectedSubtests, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="subtests" className="form-label">Subtests</label>
      <Select
        isMulti
        options={subtests.map(subtest => ({ value: subtest, label: subtest }))}
        value={selectedSubtests}
        onChange={onChange}
        placeholder="Select subtests..."
      />
    </div>
  );
};

export default SubtestsDropdown;

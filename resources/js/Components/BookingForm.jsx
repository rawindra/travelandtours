import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

const BookingForm = ({ bookNow, close, processing }) => {
    const [leader, setLeader] = useState({ name: '', number: '', is_leader: true });
    const [members, setMembers] = useState([]);

    const handleLeaderChange = (event) => {
        const { name, value } = event.target;
        setLeader({ ...leader, [name]: value });
    };

    const handleMemberChange = (index, event) => {
        const { name, value } = event.target;
        const updatedMembers = members.map((member, i) =>
            i === index ? { ...member, [name]: value } : member
        );
        setMembers(updatedMembers);
    };

    const handleAddMember = () => {
        setMembers([...members, { name: '', number: '', is_leader: false }]);
    };

    const handleRemoveMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = [leader, ...members];
        bookNow(data);
    };

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add Members you want to book for this package
                    </h2>
                    <PrimaryButton onClick={handleAddMember}>Add Member</PrimaryButton>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h3 className="text-md font-medium text-gray-700">Leader Information</h3>
                        <div className="flex mb-2 gap-2 items-center">
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered max-w-xs"
                                placeholder="Leader Name"
                                value={leader.name}
                                onChange={handleLeaderChange}
                                required
                            />
                            <input
                                type="text"
                                name="number"
                                className="input input-bordered max-w-xs"
                                placeholder="Leader Number"
                                value={leader.number}
                                onChange={handleLeaderChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        {members.map((member, index) => (
                            <div key={index} className="flex mb-2 gap-2 items-center">
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered max-w-xs"
                                    placeholder="Member Name"
                                    value={member.name}
                                    onChange={(event) => handleMemberChange(index, event)}
                                />
                                <input
                                    type="text"
                                    name="number"
                                    className="input input-bordered max-w-xs"
                                    placeholder="Member Number"
                                    value={member.number}
                                    onChange={(event) => handleMemberChange(index, event)}
                                />
                                <FaTrash
                                    size={20}
                                    className="cursor-pointer text-red-500"
                                    onClick={() => handleRemoveMember(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                        <SecondaryButton onClick={close}>Cancel</SecondaryButton>
                        <PrimaryButton className="bg-green-500" disabled={processing}>
                            Confirm
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BookingForm;

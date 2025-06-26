import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type StatusCardProps = {
  title: string;
  count: number;
  onPress: () => void;
  className?: string;
};

const StatusCard = ({ title, count, onPress, className = '' }: StatusCardProps) => (
  <TouchableOpacity
    onPress={onPress}
    className={`${className} w-full md:w-[48%] p-6 rounded-lg items-center justify-center`}
    style={{ maxWidth: 400 }}
  >
    <Text className="text-white text-lg font-semibold">{title}</Text>
    <Text className="text-white text-4xl font-bold">{count}</Text>
  </TouchableOpacity>
);

export default StatusCard;

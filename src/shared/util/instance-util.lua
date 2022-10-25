local function getObject(fullName)
	local segments = fullName:split(".")
	local current = game

	for _, location in pairs(segments) do
		current = current[location]
	end

	return current
end

return getObject
